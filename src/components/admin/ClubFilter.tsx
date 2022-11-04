import { useFilterStore } from "src/pages/admin";

export default function ClubFilter() {
  const setFilterField = useFilterStore((state) => state.setFilterField);
  return (
    <>
      <div>
        <div className="flex">
          <div className="flex flex-col">
            <label className="font-bold">
              Filter by approved
            </label>
            <select
              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="approved"
              id="approved"
              onChange={(e) => {
                setFilterField({
                  name: "isApproved",
                  value: e.target.value === "all" ? undefined : e.target.value,
                });
              }}
            >
              <option value="all">all</option>
              <option value="true">approved</option>
              <option value="false">not approved</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
