import React, {useState, useEffect, useRef} from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, callback: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

// Define the props interface
interface MultiSelectCheckboxProps<T> {
    options?: T[];
    itemName?: string;
    placeholder?: string;
    defaultSelectedOptions?: T[];
    onChange?: (selected: T[]) => void;
    // Optional key and label for objects
    keyExtractor?: (item: T) => string;
    labelExtractor?: (item: T) => string;
}

function MultiSelectCheckbox<T = string>({
                                             options = [],
                                             itemName,
                                             placeholder = "Select options",
                                             onChange,
                                             defaultSelectedOptions = [],
                                             keyExtractor,
                                             labelExtractor
                                         }: MultiSelectCheckboxProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<T[]>(defaultSelectedOptions);

    // Default extractors if not provided
    const defaultKeyExtractor = (item: T) =>
        typeof item === 'object' && item !== null && 'id' in item
            ? String((item as any).id)
            : String(item);

    const defaultLabelExtractor = (item: T) =>
        typeof item === 'object' && item !== null && 'label' in item
            ? String((item as any).label)
            : String(item);

    const getKey = keyExtractor || defaultKeyExtractor;
    const getLabel = labelExtractor || defaultLabelExtractor;

    const toggleOption = (option: T) => {
        const newSelectedOptions = selectedOptions.some(selected => getKey(selected) === getKey(option))
            ? selectedOptions.filter(item => getKey(item) !== getKey(option))
            : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    const toggleDropdown = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setIsOpen(false);
    });

    useEffect(() => {
        setSelectedOptions(defaultSelectedOptions);
    }, [defaultSelectedOptions]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            {/* Dropdown Trigger */}
            <button
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                <span className="text-sm text-black">
                  {selectedOptions.length > 0
                      ? `${selectedOptions.length} ${itemName}(s) selected`
                      : placeholder}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Options */}
            {isOpen && options.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => {
                        const optionKey = getKey(option);
                        const optionLabel = getLabel(option);
                        const isSelected = selectedOptions.some(
                            selected => getKey(selected) === optionKey
                        );

                        return (
                            <label
                                key={optionKey}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isSelected}
                                    onChange={() => toggleOption(option)}
                                />
                                <span
                                    className={`w-5 h-5 border mr-3 flex items-center justify-center rounded ${
                                        isSelected
                                            ? 'bg-primary-500 border-primary-500'
                                            : 'bg-white border-gray-300'
                                    }`}
                                >
                  {isSelected && (
                      <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </span>
                                {optionLabel}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MultiSelectCheckbox;