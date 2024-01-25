import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function HomePage() {
  async function donate(formData: FormData) {
    "use server";

    // eslint-disable-next-line no-console
    console.log(formData);
  }

  return (
    <form action={donate} className="m-auto grid max-w-96 gap-4 rounded-lg border p-4">
      <Label className="grid gap-2">
        <span>Valor</span>
        <Input name="amount" type="number" />
      </Label>
      <Label className="grid gap-2">
        <span>Tu mensaje en la donación</span>
        <Textarea name="message" />
      </Label>
      <Button>Enviar</Button>
    </form>
  );
}
