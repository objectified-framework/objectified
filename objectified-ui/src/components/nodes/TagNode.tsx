import {NodeProps} from "@xyflow/react";
import {Typography} from "@mui/material";

export const TagNode = ({
  data: { tagName, tagDescription },
}: NodeProps<{ tagName: string, tagDescription: string }>) => {
  return (
    <div style={{ border: '1px solid #000', borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#fff' }}>
      <div style={{ borderTopLeftRadius: 3, borderTopRightRadius: 3, backgroundColor: '#ff0', borderBottom: '1px solid #ccc',
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
