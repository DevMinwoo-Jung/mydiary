import React, { memo, useCallback } from 'react'
import { Input, Menu } from 'antd'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput';
import Router from 'next/router'
import { COLOR_DBE2EF, FONT_COLOR, WHITE } from 'libs/css/color';

const SearchInput = styled(Input.Search)`
  color: '#B0B0B0';
  background-color: '#B0B0B0';
  border: 1px solid #B0B0B0;
  & .ant-btn-primary {
    color: ${FONT_COLOR};
    background-color: ${WHITE};
    border: 1px solid #B0B0B0;
    margin-right: -0.15rem;
  }
  & .ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button {
    color: '#B0B0B0';
    background-color: '#B0B0B0';
  }
`;

const _SearchForm = () => {
  const [searchInput, onChangeSearch] = useInput('');
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`)
  }, [searchInput])


  return (
  <div>  
      <SearchInput enterButton value={searchInput} onChange={onChangeSearch} onSearch={onSearch}/>
  </div>
  )
}

const SearchForm = memo(_SearchForm)

export default SearchForm