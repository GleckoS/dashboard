import { CryptoDashboard } from "@/components/crypto-dashboard";
import { TaskManagement } from "@/components/task-mangement";
import { Grid } from "@mui/material";

const Page = async () => {
  return (
    <main>
      <Grid container spacing={6} sx={{ padding: 2 }}>
        <TaskManagement />
        <CryptoDashboard />
      </Grid>
    </main>
  );
};

export default Page;
