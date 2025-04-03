'use client';

import {
  Link,
  Stack,
  Typography,
} from "@mui/material";

const WhatsNew = () => {
  const baseGithub = 'https://github.com/objectified-framework/objectified/issues';

  return (
    <>
      <Stack direction={'column'}>
        <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '6px' }}>
          <Typography className={'font-bold'}>
            Version 0.1.x
          </Typography>
        </div>

        <div style={{ padding: '10px' }}>
          <li> <Link href={`${baseGithub}/163`} target={'_none'}>#163</Link> Preserves state of previously selected tenant.</li>
          <li> <Link href={`${baseGithub}/158`} target={'_none'}>#158</Link> Modify error so that the login is shown.</li>
          <li> <Link href={`${baseGithub}/212`} target={'_none'}>#212</Link> Introduces ability to export class definition.</li>
          <li> <Link href={`${baseGithub}/121`} target={'_none'}>#121</Link> Added SQL schema generation in Class inspection.</li>
          <li> <Link href={`${baseGithub}/133`} target={'_none'}>#133</Link> Added Protobuf schema generation in Class inspection.</li>
          <li> <Link href={`${baseGithub}/189`} target={'_none'}>#189</Link> Ability to change passwords is in place.</li>
          <li> <Link href={`${baseGithub}/188`} target={'_none'}>#188</Link> Last login recording.</li>
          <li> <Link href={`${baseGithub}/214`} target={'_none'}>#214</Link> Increased size of profile form on the app.</li>
        </div>

        <p style={{ padding: '4px' }}/>

        <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '6px' }}>
          <Typography className={'font-bold'}>
            Version 0.0.3
          </Typography>
        </div>

        <div style={{ padding: '10px' }}>
          <li> Brand new layout, brand new look.  Slowly evolving!</li>
        </div>

        <p style={{ padding: '4px' }}/>

        <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '6px' }}>
          <Typography className={'font-bold'}>
            Version 0.0.2
          </Typography>
        </div>

        <div style={{ padding: '10px' }}>
          <li> Added API_KEY management and classes to the database</li>
          <li> Created '/swagger' URL for external REST services (soon to be exposed)</li>
          <li> Added the beginnings of a designer page using ReactFlow</li>
          <li> Added validation in fields in autogen forms (name and description, mainly)</li>
          <li> Validated fields now contain helper text to explain allowed values</li>
          <li> Fixed text entry bug in object fields</li>
          <li> Fixed app.objectified.dev to redirect to /login when JWT session is not active</li>
          <li> Added username and password authentication</li>
          <li> More fixes to the layout in the base screens</li>
          <li> Changed login screen to look more professional</li>
          <li> Fixes to button functionality in the table listings</li>
          <li> BUG: Auto form corrects 'object' type to use JSON formatting</li>
          <li> Added logos</li>
          <li> Login sources increased to GitLab and Google</li>
        </div>
      </Stack>
    </>
  );
}

export default WhatsNew;
