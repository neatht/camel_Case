import React, { useState } from 'react';

import { AutoComplete } from 'antd';


type CompanyAutoCompleteProps = {
    /** Callback function for when a company is selected */
    onSelect?: (value: string) => void;
    /** Callback function for when the input field is changed */
    onChange?: (value: string) => void;
    //** Initial value for the input field */
    initialValue?: string;
}

function CompanyAutoComplete(props: CompanyAutoCompleteProps) {
    
    const [options, setOptions] = useState<Array<any>>();
    const [value, setValue] = useState(props.initialValue ? props.initialValue : "");
    
    async function fetchCompanyAutoComplete(query: string): Promise<Array<any>> {
        const res = await fetch ('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + query);
        return res.json();
    }
  
    async function searchResult(query: string) {

        const data = await fetchCompanyAutoComplete(query);
    
        return data
            .map((item: any, idx: any) => {
                return ({
                    value: (`${item.name}`),
                    label: (
                        <div style={{ padding: 5 }}>
                            <span style={{ paddingRight: 10 }}>
                                <img alt=" " src={item.logo} width="20px" style={{borderRadius: 10}}/>
                            </span>
                            <span>
                                {item.name}
                            </span>
                        </div>),
                });
        });
    };

    const handleValueChange = (value: string) => {
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    }

    async function handleSearch(value: string) { 
      setOptions(value ? await searchResult(value) : []);
    };
  
    const onSelect = (value: string) => {
      handleValueChange(value);
      if (props.onSelect) {
        props.onSelect(value)
      }
    };

    return (
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        onChange={handleValueChange}
        value={value}
      />
      
    );
}

export default CompanyAutoComplete; 