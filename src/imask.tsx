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

const LaserCodeMaskAdapter = forwardRef<HTMLElement, IMaskProps>(
  function LaserCodeMaskAdapter(props, ref: React.Ref<any>) {
    const { onChange, ...other } = props;
    const [onFocus, setOnFocus] = useState(false);
    return (
      <IMaskInput
        {...other}
        mask={onFocus ? "##0000000000" : "##0 0000000 00"}
        definitions={{
          "#": /[A-Z]/,
          "0": /[0-9]/,
        }}
        prepareChar={(str: string) => str.toUpperCase()}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={() => {
          setOnFocus(false);
        }}
        autoCorrect="off"
        onInput={(e: any) => {
          if (e.target.value.length > 12) {
            e.target.value = props.value;
            return;
          }

          let getLastChar = e.target.value.slice(-1);
          // english char match index 0, 1 and 2 - 11 is number
          if (getLastChar.match(/[A-Z]/) && e.target.value.length < 3) {
            return;
          } else if (getLastChar.match(/[0-9]/) && e.target.value.length > 2) {
            return;
          } else {
            e.target.value = props.value;
          }
        }}
      />
    );
  },
);

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
          onChange({ target: { name: props.name, value: currentValue } });
        }}
        onInput={(e: any) => {
          console.log("on input", e.target.value, 'current value: ', currentValue)
          if (e.target.value.length > 40) { 
            e.target.value = currentValue;
            return
          }

          let getLastChar = e.target.value.slice(-1);
          console.log('getLastChar: ', getLastChar);
          if (getLastChar.match(new RegExp(props.mask))) {
            console.log('match');
            setCurrentValue(e.target.value);
          } else {
            e.target.value = currentValue;
            console.log('not match');
          }
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
  RegexMaskAdapter2,
  LaserCodeMaskAdapter
};

