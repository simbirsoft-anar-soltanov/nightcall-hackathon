import { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';
import { useStyles, handleMenuProps, getSxManage } from './Dropdown.internals';

type tDropdownProps = {
  value: number | string;
  items: { key: number | string; value: number | string }[];
  name?: string;
  control?: Control<FieldValues, string>;
  disabled?: boolean;
  isManage?: boolean;
  handleChange?: ({ target: { value } }: SelectChangeEvent) => void;
};

const DropDown: FC<tDropdownProps> = ({
  value,
  handleChange,
  items,
  name,
  control,
  isManage,
  disabled,
}) => {
  const { formControl, select, selectIcon, list, paper } = useStyles();

  const menuProps = handleMenuProps(list, paper);

  const styledManage = getSxManage(isManage);

  return (
    <FormControl className={formControl} sx={styledManage}>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              data-test-id={`select-${name}`}
              MenuProps={menuProps}
              classes={{ select, icon: selectIcon }}
              IconComponent={ArrowIcon}
              disabled={disabled}
              {...field}
            >
              {items.map(({ key, value }) => (
                <MenuItem
                  data-test-id={`selectItem-${key}`}
                  key={key}
                  value={value}
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      ) : (
        <Select
          data-test-id='select'
          value={value.toString()}
          onChange={handleChange}
          MenuProps={menuProps}
          classes={{ select, icon: selectIcon }}
          IconComponent={ArrowIcon}
          disabled={disabled}
        >
          {items.map(({ key, value }) => (
            <MenuItem
              data-test-id={`selectItem-${key}`}
              key={key}
              value={value}
            >
              {key}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default DropDown;
