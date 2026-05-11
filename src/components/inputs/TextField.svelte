<script lang='ts'>
  type Props = {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
  };

  let {
    id,
    name,
    label = "Label",
    type = "text",
    placeholder = "asdasds",
  }: Props = $props();
</script>

<div class="relative my-10 w-75">
  <input
    {type}
    {id}
    {name}
    {placeholder}
    class="peer h-12 w-full border-b border-accent-003 bg-transparent text-[12px] tracking-[1.5px] text-scripts outline-none transition-colors duration-300 focus:border-primary-500 pl-1.5"
  />

  <label
    for="username"
    class="pointer-events-none absolute left-0 top-1.5 text-[12px] tracking-[1.5px] text-accent-003 transition-all duration-300 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-[12px] peer-focus:-top-3 peer-focus:text-[11px] peer-focus:text-primary-500 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-[11px]"
    >{label}
    <span
      class="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary-500 transition-transform duration-300 ease-in-out peer-focus:scale-x-100 text-black"
      >a</span
    >
  </label>
</div>
