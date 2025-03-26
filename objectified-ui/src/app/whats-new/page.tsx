import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
} from "@mui/material";

const WhatsNew = () => {
  return (
    <>
      <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '6px' }}>
        <Typography className={'font-bold'}>
          Version 0.0.3
        </Typography>
        <p style={{ padding: '4px' }}/>
        <li> Brand new layout, brand new look.  Slowly evolving!</li>
      </div>

      <p style={{ padding: '20px'}}/>

      <div style={{ width: '100%', height: '36px', borderBottom: '1px solid #ccc', padding: '6px' }}>
        <Typography className={'font-bold'}>
          Version 0.0.2
        </Typography>
        <p style={{ padding: '4px' }}/>
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
    </>
  );
}

export default WhatsNew;
