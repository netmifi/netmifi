import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { splitCamelCaseToWords } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
const CustomFormField = ({ control, name, type, isPasswordVisible, placeholder, label = "", isNotLabeled = false, defaultValue = "", disabled = false, hidden = false }: CustomFormFieldProps) => {
	const isContactField = name === "phone";
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={disabled}
			render={({ field }) => (
				<FormItem className="form-item">
					<div className="flex w-full gap-2 flex-col">
						<FormLabel className="capitalize text-lg">
							{!isNotLabeled ? (label || splitCamelCaseToWords(name)) : ''}
						</FormLabel>
						<FormControl>
							{type === 'textarea'
								? (
									<Textarea
										placeholder={placeholder}
										className="resize-none"
										{...field}
									/>
								)
								: (
									isContactField ?
										<div className="contact-input" >
											<div className=" inset-y-0 left-0 flex items-center">
												<span className="text-white bg-primary rounded-xl px-3 py-2 ">
													+234
												</span>
											</div>
											<Input
												type="tel"
												name={name}
												placeholder={placeholder}
												hidden={hidden}
												value={field.value || ""}
												onChange={field.onChange}
												readOnly={true}
												className="input_field ml-2 border-none focus-visible:ring-0 bg-transparent"
											/>
										</div>
										:
										<Input
											className="input_field"
											placeholder={placeholder}
											hidden={hidden}
											{...field}
											type={
												name === "password" && isPasswordVisible
													? "text"
													: name === "password"
														? "password"
														: "text"
											}
											value={field.value || ""}
											onChange={field.onChange}
										/>
								)
							}
						</FormControl>
					</div >
					<FormMessage className="form-message" />
				</FormItem >
			)}
		/>
	);
};

export default CustomFormField;
