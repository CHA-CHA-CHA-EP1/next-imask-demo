import { forwardRef, useRef, useState, useCallback } from "react";
import { IMaskInput } from "react-imask";

interface IMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  value: string;
  name: string;
}

export type IMaskDefinition = {
  [key: string]: RegExp;
};

const RegexMaskAdapter = forwardRef<HTMLElement, IMaskProps & { mask: string }>(
  function RegexMaskAdapter(props, ref: React.Ref<any>) {
    const { onChange, ...other } = props;
    const [currentValue, setCurrentValue] = useState(
      "" || (props?.value as string),
    );

    return (
      <IMaskInput
        {...other}
        mask={new RegExp(props.mask)}
        inputRef={ref}
        value={currentValue}
        onAccept={(value: any) => {
          console.log("onAccept: ", value);
          setCurrentValue(value);
          onChange({ target: { name: props.name, value } });
        }}
        onInput={(e: any) => {
          console.log("on input", e.target.value);
        }}
      />
    );
  },
);

const RegexMaskAdapter2 = forwardRef<HTMLElement, IMaskProps & { mask: string; maxLength?: number }>(
  function RegexMaskAdapter(props, ref: React.Ref<any>) {
    const { onChange, maxLength, ...other } = props;
 
    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.which || event.keyCode;
      if (keyCode < 65 || keyCode > 90) {
        event.preventDefault();
      }
    }, []);
 
    const handleAccept = useCallback((value: string) => {
      if (maxLength) {
        // Use a function to count Thai characters correctly
        const thaiLength = (str: string) => {
          return str.replace(/[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g, '').length;
        };
 
        if (thaiLength(value) > maxLength) {
          return;
        }
      }
 
      onChange({ target: { name: props.name, value } });
    }, [onChange, props.name, maxLength]);
 
    return (
      <IMaskInput
        {...other}
        mask={new RegExp(props.mask)}
        inputRef={ref}
        onAccept={handleAccept}
        onInput={handleKeyPress}
      />
    );
  },
);

export {
  RegexMaskAdapter,
  RegexMaskAdapter2
};

