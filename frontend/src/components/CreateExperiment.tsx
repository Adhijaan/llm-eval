import { Button, Paper, TextField, Typography, Checkbox, Autocomplete } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { createExperiment } from "../api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CreateExperimentProps {
  close: () => void;
}

export default function CreateExperiment({ close }: CreateExperimentProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "10%", sm: "50%" },
        minWidth: "50vw",
        padding: 2,
        position: "relative",
        height: "fit-content",
      }}>
      <Button variant="text" color="secondary" sx={{ position: "absolute", top: 10, right: 10 }} onClick={close}>
        Close
      </Button>

      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Create Experiment
      </Typography>
      <TextField multiline fullWidth maxRows={15} minRows={4} label={"System Prompt"} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Add test cases to this experiment
      </Typography>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={[{ title: "Test 1" }, { title: "Test 2" }, { title: "Test 3" }]}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </li>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Create
      </Button>
    </Paper>
  );
}
