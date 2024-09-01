import { CircularProgress } from '@mui/joy';

export default function Loading() {
  return  (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  )
}
