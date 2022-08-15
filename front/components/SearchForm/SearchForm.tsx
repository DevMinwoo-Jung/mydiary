import React, { memo, useCallback } from 'react'
import { Input, Menu } from 'antd'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput';
import Router from 'next/router'
import { BUTTON_COLOR, COLOR_DBE2EF } from 'libs/css/color';

const SearchInput = styled(Input.Search)`
  border: 1px solid ${COLOR_DBE2EF};
  & .ant-btn-primary{
    background-color: ${BUTTON_COLOR};
  }
`;

const _SearchForm = () => {
  const [searchInput, onChangeSearch] = useInput('');
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`)
  }, [searchInput])

  return (
  <Menu mode="horizontal">  
    <Menu.Item>
      <SearchInput enterButton value={searchInput} onChange={onChangeSearch} onSearch={onSearch}/>
    </Menu.Item>
  </Menu>
  )
}

const SearchForm = memo(_SearchForm)

export default SearchForm