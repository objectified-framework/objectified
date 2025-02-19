import {HEADER_COLOR} from "@/app/components/common/ColorDatabase";
import Item from "@/app/components/common/Item";
import {
  Stack,
  Typography,
} from "@mui/material";

export const WhatsNew = () => {
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
      </div>
    </div>
  );
}

export default WhatsNew;
