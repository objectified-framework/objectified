import { initCap, propertyToType, toCamelCase, toKebabCase } from "../util";
import * as fs from 'fs';

const HEADER: string = `/**\n * This file is automatically generated.\n * Do not modify this file, any changes will be overwritten.\n *\n * Generated ${new Date()}\n */\n\n`;

export function generateControllers(controllerDirectory: string, openApi: any) {
  const tags: any = {};
  const paths = openApi.paths;

  fs.mkdirSync(controllerDirectory, { recursive: true });

  console.log(`Generating NestJS Controllers to ${controllerDirectory}:`);

  openApi.tags.forEach((tag: any) => {
    tags[tag.name] = tag;
    tags[tag.name].paths = [];
  });

  // Step 1: prepare a list of all paths associated with a tag.
  for (const path of Object.keys(paths)) {
    for (const [pathMethod, pathMethodData] of Object.entries(paths[path])) {
      for (const tag of pathMethodData["tags"]) {
        tags[tag].paths.push({
          path,
          method: pathMethod,
          data: pathMethodData,
        });
      }
    }
  }

  // Step 2: walk the list of tags, and write all controllers for each tag
  for (const tag of Object.keys(tags)) {
    const controllerName = tags[tag].name;
    const controllerDescription = tags[tag].description ?? "";

    generateController(
      controllerDirectory,
      controllerName,
      controllerDescription,
      tags[tag].paths,
    );
  }

  // Write index
  let indexBody = HEADER;
  const indexFilename = `${controllerDirectory}/index.ts`;

  for (const tag of Object.keys(tags)) {
    indexBody += `export * from './${tag}.controller';\n`;
  }

  fs.writeFileSync(indexFilename, indexBody, "utf8");
  console.log(`  + Wrote ${indexFilename}`);
}

function generateController(
  directory: string,
  name: string,
  description: string,
  paths: any[],
) {
  const controllerFile = `${directory}/${name}.controller.ts`;
  const controllerDtoImports = {};
  let controllerBody = "";
  let controllerClassBody = "";
  const controllerSecurityImports: string[] = [];

  controllerBody += HEADER;

  controllerBody += `import { Controller, Get, Delete, Post, Patch, Put, Options, Body, Param, Res, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBody, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { ${name}ServiceImpl } from '../../services';
import { Request, Response } from 'express';
`;

  for (const pathEntry of paths) {
    const { path, method } = pathEntry;
    const {
      operationId,
      description,
      summary,
      parameters,
      requestBody,
      responses,
      security,
    } = pathEntry.data;
    let convertedPath = path.replaceAll("{", ":").replaceAll("}", "");
    const requestBodyContent = requestBody?.content["application/json"];
    const inputs = [];
    const inputVariables = [];
    const inputCasts = [];
    let returnType = null;
    let functionComment = "";
    let functionBody = "";

    // Import security utilities
    for (const sec of security) {
      if (!controllerSecurityImports.includes(Object.keys(sec)[0])) {
        controllerSecurityImports.push(Object.keys(sec)[0]);
      }
    }

    // Trim converted path - first part of the URL is not required, as that is based on the URL of the
    // controller and ApiTags definition
    if (convertedPath.startsWith("/")) {
      convertedPath = convertedPath.substring(1);
    }

    if (convertedPath.indexOf("/") !== -1) {
      convertedPath = convertedPath.substring(convertedPath.indexOf("/"));
    } else {
      convertedPath = "";
    }

    functionComment += "  /**\n";
    functionComment += `   * ${description.trim().replaceAll("\n", "\n   * ")}\n`;
    functionComment += "   *\n";

    if (convertedPath.length > 0) {
      functionBody += `  @${initCap(method)}('${convertedPath}')\n`;
    } else {
      functionBody += `  @${initCap(method)}()\n`;
    }

    functionBody += "  @ApiOperation({\n";

    if (summary) {
      functionBody += `    summary: '${summary.trim().replaceAll("\n", " ").replaceAll("'", "\\'")}',\n`;
    }

    if (description) {
      functionBody += `    description: '${description.trim().replaceAll("\n", " ").replaceAll("'", "\\'")}',\n`;
    }

    functionBody += "  })\n";
    functionComment += "   * Response codes:\n";

    for (const [responseCode, responseData] of Object.entries(responses)) {
      const responseDescription = responseData["description"] ?? "";

      if (responseData["content"]) {
        const content = responseData["content"];
        const contentCode = parseInt(responseCode);
        const contentTypes = Object.keys(content);

        if (contentCode >= 200 && contentCode <= 299) {
          const contentSchema = content[contentTypes[0]].schema;
          const contentSchemaType = propertyToType(contentSchema);

          if (contentTypes.length > 1) {
            throw new Error(
              `Path ${path}, method ${method}, return code ${contentCode} has more than one content type for operation ${operationId}`,
            );
          }

          if (returnType) {
            returnType += ` | ${contentSchemaType}`;
          } else {
            returnType = contentSchemaType;
          }

          if (contentSchemaType.endsWith("Dto")) {
            controllerDtoImports[contentSchemaType] = 1;
          } else if (contentSchemaType.indexOf("[")) {
            if (
              contentSchemaType
                .substring(0, contentSchemaType.indexOf("["))
                .endsWith("Dto")
            ) {
              controllerDtoImports[
                contentSchemaType.substring(0, contentSchemaType.indexOf("["))
              ] = 1;
            }
          }
        }
      }

      functionBody += `  @ApiResponse({ status: ${responseCode}, description: '${responseDescription.trim().replaceAll("\n", " ")}' })\n`;
      functionComment += `   * - Response code '${responseCode}': '${responseDescription.trim().replaceAll("\n", " ")}'\n`;
    }

    functionComment += "   *\n";

    if (parameters) {
      for (const parameter of parameters) {
        const { name, description, schema } = parameter;
        const inPath = parameter.in;

        if (inPath.toLowerCase() === "path") {
          const parameterSchema = propertyToType(schema);

          if (parameterSchema.endsWith("Dto")) {
            controllerDtoImports[parameterSchema] = 1;
          } else if (parameterSchema.indexOf("[")) {
            if (
              parameterSchema
                .substring(0, parameterSchema.indexOf("["))
                .endsWith("Dto")
            ) {
              controllerDtoImports[
                parameterSchema.substring(0, parameterSchema.indexOf("["))
              ] = 1;
            }
          }

          functionComment += `   * @param ${name} ${description.trim().replaceAll("\n", " ")}\n`;

          inputs.push(`@Param('${name}') ${name}: ${parameterSchema}`);
          inputVariables.push(name);
        }
      }
    }

    let hasBody = false;

    if (requestBodyContent) {
      hasBody = true;
      const description = requestBody.description;
      const schema = requestBodyContent.schema;

      functionBody += "  @ApiBody({\n";

      if (description) {
        functionBody += `    description: '${description.trim().replaceAll("\n", " ")}',\n`;
      }

      if (schema.$ref) {
        const reference = schema.$ref.substring(
          schema.$ref.lastIndexOf("/") + 1,
        );

        // inputs.push(`@Body() ${toCamelCase(reference)}Dto: ${reference}Dto`);
        inputCasts.push(`const ${toCamelCase(reference)}Dto: ${reference}Dto = <${reference}Dto>bodyData['${toCamelCase(reference)}Dto'];`);
        inputVariables.push(`${toCamelCase(reference)}Dto`);
        controllerDtoImports[`${reference}Dto`] = 1;

        functionBody += `    type: ${reference}Dto,\n`;
      }

      functionBody += "  })\n";
    }

    if (hasBody) {
      functionComment += '   * @param bodyData The request body data against which the input variables will be retrieved\n';
    }

    functionComment += "   * @param request The request object\n";
    functionComment += "   * @param response The response object\n";

    for (const sec of security) {
      const secType = Object.keys(sec)[0];

      if (secType.toLowerCase() === 'api_key') {
        functionBody += '  @ApiCookieAuth()\n';
      }
    }

    if (!hasBody) {
      functionBody += `  public async ${operationId}(@Req() request: Request, @Res() response: Response, ${inputs.join(", ")}): Promise<void> {\n`;
    } else {
      functionBody += `  public async ${operationId}(@Req() request: Request, @Res() response: Response, @Body() bodyData: any, ${inputs.join(", ")}): Promise<void> {\n`;
    }

    // Authenticate first, then apply the code service call.
    for (const sec of security) {
      const secType = Object.keys(sec)[0];

      if (secType.toLowerCase() === 'api_key') {
        functionBody += `    if (!await ${secType}.validate(request)) {
      response.contentType('text/plain').status(401).send('Unauthorized');
      return;
    }
`;
      } else {
        functionBody += `    if (!request.headers.authorization || !${secType}.validate(request)) {
      response.contentType('text/plain').status(401).send('Unauthorized');
      return;
    }
`;
      }
    }

    if (inputCasts) {
      functionBody += inputCasts.map((x) => `    ${x}`).join('\n');
      functionBody += '\n';
    }

    functionBody += `    const result = await this.service.${operationId}(request, ${inputVariables.join(", ")});
    
    response.status(result.statusCode).contentType(result.returnContentType);
    
`;

    functionBody += `    if (result.additionalCookies) {
      for (const [cookie, value] of Object.entries(result.additionalCookies)) {
        response.cookie(cookie, value);
      }
    }
    
    if (result.statusMessage) {
      response.send((result.returnContentType.includes('json') ? JSON.stringify(result.statusMessage) : result.statusMessage));
    } else {
      if (result.returnValue) {
        response.send((result.returnContentType.includes('json') ? JSON.stringify(result.returnValue) : result.returnValue));
      } else {
        response.send();
      }
    }
  }
  
`;
    functionComment += "   */\n";

    controllerClassBody += functionComment + functionBody;
  }

  if (Object.keys(controllerDtoImports).length > 0) {
    controllerBody += `import { ${Object.keys(controllerDtoImports).join(", ")} } from '../dto';\n`;
  }

  controllerSecurityImports.forEach((x) => {
    controllerBody += `import { ${x} } from '../util/${x}';\n`;
  });

  controllerBody += `
/**
 * ${description.trim().replaceAll("\n", "\n * ")}
 */
@ApiTags('${toKebabCase(name)}')
@Controller('${toKebabCase(name)}')
export class ${name}Controller {

  constructor(private readonly service: ${name}ServiceImpl) { }
  
`;
  controllerBody += controllerClassBody;
  controllerBody += "}\n";

  fs.writeFileSync(controllerFile, controllerBody, "utf8");
  console.log(`  - Wrote ${controllerFile}`);
}
