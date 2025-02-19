import { useSnackbar } from "notistack";
import { useMutationData } from "../hooks/useMutationData";
import { END_POINTS } from "../constants/APIs";
import { login } from "../store/auth/login";
import { getErrorMessage } from "../util/getErrorMessage";
import { Form, Formik, FormikHelpers } from "formik";
import { Stack, Typography } from "@mui/material";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { PASSWORD_VALID } from "../constants/rgx";
import Grid from "@mui/material/Grid2";
import TextInput from "./common/UI/TextInput";
import { LoadingButton } from "@mui/lab";
import { ArrowRightIcon } from "../assets/icons";
import PasswordField from "./PasswordField";

const SignInForm: React.FC<{
  handleAuthType: () => void;
}> = ({ handleAuthType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutationData(
    END_POINTS.LOGIN, // Endpoint
    {
      method: "POST",
      onSuccess: login,
      onError: (error) => {
      console.log(error,"error")
        enqueueSnackbar(getErrorMessage(error), {
          variant: "error",
          autoHideDuration: 5000,
        });
      },
    }
  );

  const handleSubmit = async (
    values: {
      username: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{ username: string; password: string }>
  ) => {
    formikHelpers.setSubmitting(true);
    try {
      console.log(values,"values")
      mutate(values);
    } catch (error) {
      console.log(error, "ee");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <Stack
      //   spacing={SPACING}
      style={{
        background: "#fff",
        padding: 4,
      }}
    >
      {/* <ErrorAlert error={error} /> */}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
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
              <Grid size={{ sm: 12 }}>
                <Typography variant="h5">Welcome back</Typography>
              </Grid>
              <Grid container direction="column" spacing={4}>
                <Grid>
                  <TextInput
                    name="username"
                    placeholder="Enter username"
                    label="Username"
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
                    Create New Account
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

export default SignInForm;

const validationSchema = toFormikValidationSchema(
  z.object({
    username: z.string().email(),
    password: z
      .string()
      .regex(
        PASSWORD_VALID,
        "PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character."
      ),
  })
);
