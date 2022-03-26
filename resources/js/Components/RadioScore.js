import React, { useState } from 'react'
import { RadioGroup, Stack, Radio } from '@chakra-ui/react';
const RadioScore = ({ name = 'example' }) => {
  const [value, setValue] = useState('1')
  return (
    <RadioGroup name={name} onChange={(v) => {
      console.log('v', v === 5)
      setValue(v)
    }} value={value}>
      <Stack direction='row'>
        {Array.from({ length: 5 }, (x, value) => {
          return <Radio key={value} value={value + 1}>{value + 1}</Radio>
        })}
      </Stack>
    </RadioGroup>
  )
}

export default RadioScore