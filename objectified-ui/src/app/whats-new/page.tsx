import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
} from "@mui/material";

const WhatsNew = () => {
  return (
    <div style={{width: '100%', padding: '10px'}}>
      <div style={{width: '100%', backgroundColor: HEADER_COLOR, color: '#fff', height: '50px', padding: '8px',
        borderBottom: '1px solid #000' }}>
        <Stack direction={'row'}>
          <Item sx={{width: '100%', textAlign: 'left', backgroundColor: 'inherit', padding: '0px'}}>
            <Typography sx={{color: '#fff'}} variant={'h4'} fontWeight={'bold'}>What&apos;s New</Typography>
          </Item>
        </Stack>
      </div>

      <p/>

      <div style={{width: '100%', padding: '10px'}}>
        <b>Version 0.0.2</b><br/>
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
      </div>
    </div>
  );
}

export default WhatsNew;
