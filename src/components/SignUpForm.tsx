import { useSnackbar } from "notistack";
import { useMutationData } from "../hooks/useMutationData";
import { END_POINTS } from "../constants/APIs";
import { Form, Formik, FormikHelpers } from "formik";
import { getErrorMessage } from "../util/getErrorMessage";
import { Stack, Typography } from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { NAME, PASSWORD_VALID } from "../constants/rgx";
import Grid from "@mui/material/Grid2";
import TextInput from "./common/UI/TextInput";
import PasswordField from "./PasswordField";
import { LoadingButton } from "@mui/lab";
import { ArrowRightIcon } from "../assets/icons";

const SignUpForm: React.FC<{
  handleAuthType: () => void;
}> = ({ handleAuthType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutationData(
    END_POINTS.SIGNUP, // Endpoint
    {
      method: "POST",
      onSuccess: () => {
        enqueueSnackbar("success", {
          variant: "success",
          autoHideDuration: 5000,
        });
        handleAuthType();
      },
      onError: (error) => {
        console.log(error, "error");
        enqueueSnackbar(getErrorMessage(error), {
          variant: "error",
          autoHideDuration: 5000,
        });
      },
    }
  );

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{
      name: string;
      email: string;
      password: string;
    }>
  ) => {
    formikHelpers.setSubmitting(true);
    try {
      mutate(values);
    } catch (error) {
      console.log(error, "ee");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <Stack
      style={{
        background: "#fff",
        padding: 4,
      }}
    >
      {/* <ErrorAlert error={error} /> */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSignUpSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Grid
              container
              sx={{ height: "100vh" }}
              direction="column"
              justifyContent="center"
              spacing={4}
            >
              <Grid>
                <Typography variant="h5">Registration</Typography>
              </Grid>
              <Grid container direction="column" spacing={4}>
                <Grid>
                  <TextInput
                    name="name"
                    placeholder="Enter name"
                    label="name"
                  />
                </Grid>
                <Grid>
                  <TextInput
                    name="email"
                    placeholder="Enter email"
                    label="email"
                  />
                </Grid>
                <Grid>
                  <PasswordField />
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Typography
                    fontSize={14}
                    color={"#007473"}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAuthType()}
                  >
                    Login
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Sign in {ArrowRightIcon}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default SignUpForm;

const validationSignUpSchema = toFormikValidationSchema(
  z.object({
    name: z.string().regex(NAME, "minimum of 3 alphabetic characters."),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        PASSWORD_VALID,
        "PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character."
      ),
  })
);
