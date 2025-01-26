/**
 * Autogenerator for Client code
 */
import { initCap, propertyToType, toCamelCase } from "../util";
import * as fs from 'fs';

const HEADER: string = `/**\n * This file is automatically generated.\n * Do not modify this file, any changes will be overwritten.\n *\n * Generated ${new Date()}\n */\n\n`;

export function generateClients(clientDirectory: string, openApi: any) {
  const tags: any = {};
  const paths = openApi.paths;

  fs.mkdirSync(clientDirectory, { recursive: true });

  console.log(`Generating NestJS Clients to ${clientDirectory}:`);

  for (const tag of openApi.tags) {
    tags[tag.name] = tag;
    tags[tag.name].paths = [];
  }

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

    generateClient(
      clientDirectory,
      controllerName,
      controllerDescription,
      tags[tag].paths,
    );
  }

  // Write index
  let indexBody = HEADER;
  const indexFilename = `${clientDirectory}/index.ts`;

  for (const tag of Object.keys(tags)) {
    indexBody += `export * from './${tag}.client';\n`;
  }

  fs.writeFileSync(indexFilename, indexBody, "utf8");
  console.log(`  + Wrote ${indexFilename}`);
}

/**
 * Generates the code required for Client access.
 *
 * @param directory The directory to output files to.
 * @param name The name of the current client being generated from the path name list.
 * @param description The description for the client from the path.
 * @param paths The path definitions.
 */
function generateClient(
  directory: string,
  name: string,
  description: string,
  paths: any[],
) {
  const serviceFile = `${directory}/${name}.client.ts`;
  const serviceDtoImports = {};
  let serviceBody = "";
  let serviceClassBody = "";
  let serviceImports = "";

  serviceBody += HEADER;

  for (const pathEntry of paths) {
    const { path, method } = pathEntry;
    const { operationId, description, responses, parameters, requestBody } =
      pathEntry.data;
    const requestBodyContent = requestBody?.content["application/json"];
    const inputs = [];
    const inputVariables = [];
    const inputVariableNames: string[] = [];
    const alteredPath = path.replaceAll("{", "${");

    serviceClassBody += `/**
 * ${description.trim().replaceAll("\n", "\n   * ")}
 *
`;

    for (const [responseCode, responseData] of Object.entries(responses)) {
      const responseDescription = responseData["description"] ?? "";

      serviceClassBody += ` * - Response code '${responseCode}': '${responseDescription.trim().replaceAll("\n", " ")}'\n`;
    }

    serviceClassBody += ` *\n * Service path: '${path}', Verb: '${method}'\n * \n`;

    if (parameters) {
      for (const parameter of parameters) {
        const { name, description, schema } = parameter;
        const inPath = parameter.in;

        if (inPath.toLowerCase() === "path") {
          const parameterSchema = propertyToType(schema);

          if (parameterSchema.endsWith("Dto")) {
            serviceDtoImports[parameterSchema] = 1;
          } else if (parameterSchema.indexOf("[")) {
            if (
              parameterSchema
                .substring(0, parameterSchema.indexOf("["))
                .endsWith("Dto")
            ) {
              serviceDtoImports[
                parameterSchema.substring(0, parameterSchema.indexOf("["))
              ] = 1;
            }
          }

          if (description) {
            serviceClassBody += ` * @param ${name} ${description}\n`;
          } else {
            serviceClassBody += ` * @param ${name} (undocumented input parameter)\n`;
          }

          inputs.push(`@Param('${name}') ${name}: ${parameterSchema}`);
          inputVariables.push(`${name}: ${parameterSchema}`);
          inputVariableNames.push(name);
        }
      }
    }

    if (requestBodyContent) {
      const schema = requestBodyContent.schema;

      if (schema.$ref) {
        const reference = schema.$ref.substring(
          schema.$ref.lastIndexOf("/") + 1,
        );

        inputs.push(`@Body() ${toCamelCase(reference)}Dto: ${reference}Dto`);
        inputVariables.push(`${toCamelCase(reference)}Dto: ${reference}Dto`);
        serviceDtoImports[`${reference}Dto`] = 1;
        inputVariableNames.push(`${toCamelCase(reference)}Dto`);

        if (requestBody.description) {
          serviceClassBody += ` * @param ${toCamelCase(reference)}Dto ${requestBody.description}\n`;
        }
      }
    }

    inputVariables.push("headers?: any");

    serviceClassBody += ` * @param headers Any optional additional headers to send along with the request
 */
export const Client${initCap(name)}${initCap(operationId)} = async (${inputVariables.join(", ")},) => {
  console.log(\`[Client${initCap(name)}${initCap(operationId)}] Requesting ${path}\`);
  
  const requestUrl = process.env.SERVICE_URL ?? 'http://localhost:3001';
  const config = {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };
`;
    if (method.toLowerCase() !== "get" && method.toLowerCase() !== "delete") {
      serviceClassBody += `  const postData = {\n`;
      serviceClassBody += inputVariableNames.map((x) => `    ${x}`).join(",\n");
      serviceClassBody += `,\n  };\n\n`;

      serviceClassBody += `  return axios.${method}(\`$\{requestUrl}${alteredPath}\`, postData, config)\n`;
    } else {
      serviceClassBody += `\n  return axios.${method}(\`$\{requestUrl}${alteredPath}\`, config)\n`;
    }

    serviceClassBody += `    .then((x) => x.data)
    .catch((x) => {
      console.error('Request failed', x);
      return Promise.reject(x);
    });
};

`;
  }

  if (Object.keys(serviceDtoImports).length > 0) {
    serviceImports += `import { ${Object.keys(serviceDtoImports).join(", ")} } from '../dto';\n`;
  }

  serviceImports += "import axios from 'axios';\n";

  serviceBody += serviceImports;
  serviceBody += "\n";
  serviceBody += serviceClassBody;

  fs.writeFileSync(serviceFile, serviceBody, "utf8");
  console.log(`  - Wrote ${serviceFile}`);
}
