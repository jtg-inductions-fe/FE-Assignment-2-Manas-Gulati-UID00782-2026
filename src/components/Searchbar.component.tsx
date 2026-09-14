import SearchIcon from '@mui/icons-material/Search';
import {
    StyledSearchContainer,
    StyledSearchIconContainer,
    StyledSearchInput,
} from 'styles/Searchbar.styles';
import { SearchBarProps } from 'types/searchbar.types';

export const Searchbar = ({
    value = '',
    placeholder = 'Search…',
    ariaLabel = placeholder,
    onChange,
}: SearchBarProps) => (
    <StyledSearchContainer role="search">
        <StyledSearchIconContainer>
            <SearchIcon fontSize="small" />
        </StyledSearchIconContainer>

        <StyledSearchInput
            value={value}
            placeholder={placeholder}
            inputProps={{
                'aria-label': ariaLabel,
            }}
            onChange={(event: { target: { value: string } }) =>
                onChange(event.target.value)
            }
        />
    </StyledSearchContainer>
);
