import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BasicAccordion({Question,Answer}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontSize:"14px"}}>{Question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{fontSize:"12px"}}>
          {Answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    
    </div>
  );
}