interface SelectProps<T> {
    options: T[];
    value: string;
    onChange: (value: string) => void;
    keyField: keyof T;
    valueField: keyof T;
    className?: string;
}

export const Select = <T,>({
    options,
    value,
    onChange,
    keyField,
    valueField,
    className,
}: SelectProps<T>) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`p-2 border rounded ${className}`}
    >
        {options.map((option) => (
            <option key={String(option[keyField])} value={String(option[keyField])}>
                {String(option[valueField])}
            </option>
        ))}
    </select>
);
