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
    const [currentValue, setCurrentValue] = useState("");

    return (
      <IMaskInput
        {...other}
        mask={onFocus ? "##0000000000" : "##0 0000000 00"}
        unmask={true}
        definitions={{
          "#": /[A-Za-z ]/,
          "0": /[0-9 ]/,
        }}
        prepareChar={(str: string) => str.toUpperCase()}
        inputRef={ref}
        onAccept={(value: any) => {
          value = value.replace(/ /g, "");
          setCurrentValue(value);
          onChange({ target: { name: props.name, value: currentValue } });
        }}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={() => {
          setOnFocus(false);
        }}
        value={currentValue}
        onInput={(e: any) => {
          const prevValue = currentValue;
          const inputElement = e.target as HTMLInputElement;
          // const newValue = e.target.value.replace(/ /g, "");
          const newValue = e.target.value;

          console.log('value: ', newValue);
          
          if (newValue.includes(" ")) {
            console.log("found space")
            e.target.value = prevValue;
            return;
          }

          let isValid = true;
          let wrongIndex = null;
          for (let i = 0; i < newValue.length; i++) {
            if (i < 2) {
              if (!newValue[i].match(/[A-Za-z ]/)) {
                isValid = false;
                wrongIndex = i;
                break;
              }
            } else {
              if (!newValue[i].match(/[0-9 ]/)) {
                isValid = false;
                wrongIndex = i;
                break;
              }
            }
          }

          if (e.target.value.length > 12 && wrongIndex) {
            e.target.value = currentValue;
            inputElement.setSelectionRange(
              currentValue.length,
              currentValue.length,
            );
            return;
          }

          if (isValid && !wrongIndex) {
            setCurrentValue(newValue);
          } else {
            e.target.value = prevValue;
            inputElement.setSelectionRange(wrongIndex, wrongIndex);
          }
        }}
        autoCorrect="off"
        autoCapitalize="off"
        autofix={false}
        autoComplete="off"
        spellCheck={false}
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
          setCurrentValue(value);
          onChange({ target: { name: props.name, value: currentValue } });
        }}
        overwrite={false}
        onInput={(e: any) => {
          const newValue = e.target.value;
          const prevValue = currentValue;
          const inputElement = e.target;
          const cursorPosition = inputElement.selectionStart ?? 0;

          if (e.target.value.length > 40) {
            requestAnimationFrame(() => {
              inputElement.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            })
            e.target.value = currentValue;
            return;
          }


          let isValid = true;
          let wrongIndex = null;

          if (newValue.length > prevValue.length) {
            for (let i = 0; i < newValue.length; i++) {
              if (newValue[i] !== prevValue[i]) {
                if (!newValue[i].match(props.mask)) {
                  isValid = false;
                  wrongIndex = i;
                  break;
                }
              }
            }
          }
          
          if (!isValid) {
            e.target.value = prevValue;
            requestAnimationFrame(() => {
              inputElement.setSelectionRange(wrongIndex, wrongIndex);
            });
            return;
          } else {
            setCurrentValue(newValue);
            requestAnimationFrame(() => {
              inputElement.setSelectionRange(cursorPosition, cursorPosition);
            });
          }

        }}
        onBlur={() => {
          onChange({ target: { name: props.name, value: currentValue } });
        }}
        autoCorrect="off"
        autoCapitalize="off"
        autofix={false}
        autoComplete="off"
        spellCheck={false}
      />
    );
  },
);

const RegexMaskAdapter2 = forwardRef<HTMLElement, IMaskProps & { mask: string; maxLength?: number }>(
  function RegexMaskAdapter(props, ref: React.Ref<any>) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={new RegExp(props.mask)}
        inputRef={ref}
        value={props.value}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value: value } });
        }}
        onInput={(e: any) => {
          console.log(e.target.value);
          // if test regexp failed, revert to previous value
          if (!new RegExp(props.mask).test(e.target.value)) {
            e.target.value = props.value;
            e.target.selectionStart = e.target.selectionEnd = props.value.length;
            return;
          }
        }}
        overwrite={false}
        autoCorrect="off"
        autoCapitalize="off"
        autofix={false}
        autoComplete="off"
        spellCheck={false}
      />
    );
  },
);

export {
  RegexMaskAdapter,
  RegexMaskAdapter2,
  LaserCodeMaskAdapter
};

