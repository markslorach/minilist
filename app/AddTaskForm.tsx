import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlus } from "lucide-react"

const AddTaskForm = () => {
  return (
    <form action="">
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="What do you want to do?"
        className="border-none bg-transparent dark:bg-transparent px-0"
      />
      <Button className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent text-gray-500 dark:text-gray-400 p-0">
        <CirclePlus />
      </Button>
    </div>
  </form>
  )
}

export default AddTaskForm