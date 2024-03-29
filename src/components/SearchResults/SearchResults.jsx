import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { LIST_ALL_USERS, LIST_USERS_BY_NAME } from '../../graphql/users';

import {
  UserTable, UserRow, AvatarColumn, NameColumn, Avatar,
} from './SearchResults.styles';

const SearchResults = ({ query, onUserClick }) => {
  const formattedQuery = React.useMemo(() => query.toLowerCase(), [query]);

  const { loading, error, data } = useQuery(
    formattedQuery
      ? LIST_USERS_BY_NAME
      : LIST_ALL_USERS,
    {
      variables: {
        name: formattedQuery,
      },
    },
  );

  return (
    <div>
      {!!loading && <p>Searching</p>}
      {!loading && !data?.users.length && <p>No results</p>}
      {!loading && !!error && <p>{`${error}`}</p>}
      {
        !loading
        && (
          <UserTable>
            {data?.users.map((user) => (
              <UserRow
                key={`user-${user.name}`}
                style={{ width: '100%', marginTop: '10px' }}
              >
                <AvatarColumn>
                  <Avatar
                    onClick={() => onUserClick(user)}
                    src={user.avatar}
                    alt="User avatar"
                  />
                </AvatarColumn>
                <NameColumn
                  onClick={() => onUserClick(user)}
                >
                  {user.name}
                </NameColumn>
              </UserRow>
            ))}
          </UserTable>
        )
      }
    </div>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  onUserClick: PropTypes.func.isRequired,
};

export default SearchResults;
