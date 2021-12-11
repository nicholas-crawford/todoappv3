import React from 'react';

interface TextProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Text = (props: TextProps) => {
    const {
        children,
        className,
        onClick,
    } = props;

    return (
        <div className={className} onClick={onClick}>{children}</div>
    )
}

export default Text;