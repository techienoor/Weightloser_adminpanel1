import styled from 'styled-components'
import { device } from './Device'

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 40px 0;

    @media ${device.mobileL} {
        background-color: blue;
    }

  `