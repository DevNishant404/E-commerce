import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText}) {
  function renderInputByComponentType(getcontroleItem) {
    let element = null;
    const value = formData[getcontroleItem.name] || "";
    console.log(` current value= ${value}`)
    

    switch (getcontroleItem.componentType) {
      case "input":
        element = (
          <Input
            value={value}
            type={getcontroleItem.type}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            id={getcontroleItem.name}
            onChange={(event) =>
              setFormData({ ...formData, [getcontroleItem.name]: event.target.value })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getcontroleItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontroleItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {getcontroleItem.options &&
                  getcontroleItem.options.length > 0 &&
                  getcontroleItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            value={value}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            id={getcontroleItem.id}
            onChange={(event) =>
              setFormData({ ...formData, [getcontroleItem.name]: event.target.value })
            }
          />
        );
        break;

      default:
        element = (
          <input
            value={value}
            type={getcontroleItem.type}
            name={getcontroleItem.name}
            placeholder={getcontroleItem.placeholder}
            id={getcontroleItem.name}
            onChange={(event) =>
              setFormData({ ...formData, [getcontroleItem.name]: event.target.value })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button  className="mt-2 w-full">{buttonText || "Submit"}</Button>
    </form>
  );
}

export default CommonForm;
