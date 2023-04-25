import styles from "./index.module.scss";

const Index = ({ label, type, name, value, isRequired, placeholder, onChange, maxLength, minLength }) => {
  return (
    <div className={styles.wrapper}>
      {
        label && (
          <label>{label}</label>
        )
      }
      <input 
      name={name} 
      value={value} 
      required={isRequired} 
      placeholder={placeholder}
      type={type}
      onChange={onChange} 
      maxLength={maxLength}
      minLength={minLength}  
      />
    </div>
  );
}

export default Index;
