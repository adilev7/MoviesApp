import React from 'react'
import MoviesGallery from '@/components/MoviesGallery'
import { Stack, Typography } from '@mui/material'

const HomePage = () => {
  return (
    <Stack>
      <Typography variant='h1' textAlign="center" fontWeight="300" >MoviesApp</Typography>
      <MoviesGallery/>
    </Stack>
  )
}

export default HomePage