import React from 'react'
import styled from 'styled-components'

const Skeleton = (props) => {
  return (
    <Container w={props.w} h={props.h} variant={props.variant} style={props.style}/>
  )
}

const Container = styled.div`
  background-color: var(--load);
  width: ${$props => $props.w ? $props.w : 0};
  height: ${$props => $props.h ? $props.h : 0};
  border-radius: ${$props => $props.variant==='circular' ? '50%' : '0px'};
`

export default Skeleton