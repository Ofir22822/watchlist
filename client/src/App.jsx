import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Mui from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';
import Calender from './components/calender/';
import Nav from './components/nav/';

export default function App() {
  return (
    <main>
      <Grid container spacing={0} sx={{height:"100vh"}}>
          <Grid xs={2} className="bg-secondary d-flex align-items-center justify-content-center">
            <Nav />
          </Grid>
          <Grid xs={10} className="d-flex align-items-center justify-content-center">
            <Calender />
          </Grid>
        </Grid>
    </main>
  )
}
