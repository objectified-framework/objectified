import {NodeProps} from "@xyflow/react";
import {Typography} from "@mui/material";

export const TagNode = ({
  data: { tagName, tagDescription },
}: NodeProps<{ tagName: string, tagDescription: string }>) => {
  return (
    <div style={{ border: '1px solid #000', borderTopLeftRadius: 6, borderTopRightRadius: 6, backgroundColor: '#fff' }}>
      <div style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6, backgroundColor: '#ff0', borderBottom: '1px solid #ccc',
      paddingLeft: '10px' }}>
        {tagName}
      </div>
      <div>
        <Typography style={{ maxWidth: '400px' }}>
          {tagDescription}
        </Typography>
      </div>
    </div>
  );
};

export default TagNode;
