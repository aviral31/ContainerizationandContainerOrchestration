import React from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const Root = styled('div')(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "20ch",
}));

const Level = [
  { value: "beginner", label: "beginner" },
  { value: "intermediate", label: "intermediate" },
  { value: "advance", label: "advance" },
];

export default function QuestionUpload() {
  const [value, setValue] = React.useState({});
  const [msg, setMsg] = React.useState("");

  const handleChange = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async () => {
    if (!value.question_title || !value.question || !value.tag_level || !value.skill_tag || !value.sub_tag) {
      alert("Please enter all * fields");
      return;
    }

    let total_marks = parseInt(value.total_marks);
    try {
      const res = await axios.post("http://localhost:3000/uploadQuestion", {
        question_title: value.question_title,
        question: value.question,
        tag_level: value.tag_level,
        skill_tag: value.skill_tag,
        sub_tag: value.sub_tag,
        solution: value.solution,
        total_marks: total_marks,
      });
      setMsg(res.data.message);
    } catch (err) {
      console.error("Upload failed:", err);
      setMsg("Error uploading question");
    }
  };

  return (
    <Root>
      <div>
        <StyledTextField
          label="Question Title"
          placeholder="Enter your Question title"
          helperText="Ex: building static page with HTML"
          fullWidth
          required
          onChange={handleChange}
          name="question_title"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <StyledTextField
          label="Skill Tag"
          name="skill_tag"
          required
          onChange={handleChange}
          helperText="Ex: HTML and CSS"
        />
        <StyledTextField
          label="Sub Tag"
          name="sub_tag"
          required
          onChange={handleChange}
          helperText="Ex: Flexbox in HTML"
        />
        <StyledTextField
          label="Total Marks"
          name="total_marks"
          required
          onChange={handleChange}
          helperText="Ex: 20"
        />
      </div>

      <div>
        <StyledTextField
          label="Problem Statement"
          placeholder="Write your question problem statement"
          helperText="Full width!"
          fullWidth
          multiline
          minRows={5}
          required
          name="question"
          onChange={handleChange}
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <StyledTextField
          select
          label="Tag Level"
          name="tag_level"
          required
          onChange={handleChange}
          helperText="Please select the skill level"
          SelectProps={{ native: true }}
        >
          {Level.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledTextField>
        <StyledTextField
          label="Solution Upload"
          name="solution"
          placeholder="Provide Solution here"
          helperText="You can give a GitHub link also"
          fullWidth
          multiline
          minRows={3}
          onChange={handleChange}
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976d2", color: "#fff" }}
          onClick={handleClick}
        >
          Submit
        </Button>
        <p style={{ color: "red" }}>NOTICE: {msg}</p>
      </div>
    </Root>
  );
}
