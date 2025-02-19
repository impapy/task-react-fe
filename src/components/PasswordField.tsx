import { useState } from "react";
import TextInput from "./common/UI/TextInput";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordField = () => {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      name="password"
      type={show ? "text" : "password"}
      placeholder="Enter password"
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShow((s) => !s);
              }}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
