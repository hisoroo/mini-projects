import PropTypes from 'prop-types';
import "./Button.css";

export default function Button({ className, value, label, onClick }) {
    return (
        <button className={className} value={value} onClick={() => onClick(value)}>
            {label}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};