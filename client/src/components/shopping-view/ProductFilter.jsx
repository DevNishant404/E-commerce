import { filterOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-3 space-y-4">
        {Object.keys(filterOptions).map((sectionKey) => {
          return (
            <div key={sectionKey}>
              <h3 className="text-base font-bold">{sectionKey}</h3>
              <div className="grid gap-2 border-b-2 border-b-gray-200 py-1 mt-2">
                {filterOptions[sectionKey].map((option) => {
                  const isChecked =
                    filters &&
                    filters[sectionKey] &&
                    filters[sectionKey].includes(option.id);

                  return (
                    <Label
                      className="flex items-center gap-2 cursor-pointer"
                      key={option.id}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() =>
                          handleFilter(sectionKey, option.id)
                        }
                      />
                      {option.label}
                    </Label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilter;
