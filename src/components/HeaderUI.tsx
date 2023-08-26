interface HeaderUIProps {
  openDeleteModal: () => void;
}

function HeaderUI({ openDeleteModal }: HeaderUIProps) {
  return (
    <section className="flex flex-col justify-between md:flex-row md:items-center gap-2 mb-12">
      <h1 className="font-bold text-lg md:text-3xl ">Marvelous v2.0</h1>
      <p
        onClick={openDeleteModal}
        className="cursor-pointer underline text-blue-500"
      >
        Delete all tasks
      </p>
    </section>
  );
}

export default HeaderUI;
