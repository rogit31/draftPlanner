import { FC } from 'react';

interface ChampFieldProps {
    value: string;
    index: number;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    champImage?: string | null;
}

const ChampField: FC<ChampFieldProps> = ({ value, index, handleNameChange, champImage }) => {
    return (
        <div className="prioPickInputWrapper">
            <input
                type="text"
                className="prioPickInput"
                value={value}
                onChange={(event) => handleNameChange(event, index)}
            />
            {champImage && <img src={champImage} alt={value} />}
        </div>
    );
};

export default ChampField;
