import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//criando um componente baseado na tag input
const InputBase = styled.input`
        width: 100%;
        padding: 15px;
        font-size: 14px;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.contrastText};
        background-color: ${({ theme }) => theme.colors.mainBg};
        border-radius: ${({ theme }) => theme.borderRadiusRound};
        outline: 0;
        margin-bottom: 25px;
`;

                    // passando como parâmetro quais propriedades nosso componente Input vai ter
export default function Input({ onChange, placeholder }) {
        return (
            <div>
                <InputBase placeholder={ placeholder} onChange={ onChange }/>
            </div>
        );
}

Input.defaultProps = {
    value:'',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};