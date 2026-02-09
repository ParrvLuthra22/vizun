import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'default' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'default',
    children,
    className = '',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'default' ? `btn-${size}` : '';

    const classes = [baseClass, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
