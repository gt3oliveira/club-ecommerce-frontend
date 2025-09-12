import styled from 'styled-components'
import Colors from '../../theme/theme.colors'

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${Colors.background.dark};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: ${Colors.text.white};
  position: fixed;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const HeaderTitle = styled.h2`
  font-height: bold;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`

export const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
`

export const HeaderItem = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  align-items: center;
  cursor: pointer;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;

    @media (max-width: 768px) {
      margin-right: 0;
    }
  }
`
