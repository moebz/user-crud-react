import React from "react";
import { Filter } from "./Filter";
import { UsersTable } from "./UsersTable";

function UserList({
  setFilter,
  currentMilliseconds,
  filter,
  handleApplyFilter,
  clearFilter,
  users,
  currentPage,
  handlePageChange,
  totalNumberOfPages,
  order,
  orderBy,
  createSortHandler,
  askForDeletionConfirmation,
  showEditionForm,
}) {
  return (
    <>
      <Filter
        setFilter={setFilter}
        currentMilliseconds={currentMilliseconds}
        filter={filter}
        handleApplyFilter={handleApplyFilter}
        clearFilter={clearFilter}
      />
      <UsersTable
        users={users}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalNumberOfPages={totalNumberOfPages}
        order={order}
        orderBy={orderBy}
        createSortHandler={createSortHandler}
        askForDeletionConfirmation={askForDeletionConfirmation}
        showEditionForm={showEditionForm}
      />
    </>
  );
}

export { UserList };
