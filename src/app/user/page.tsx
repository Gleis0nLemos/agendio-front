import UserGreeting from "@/components/user/UserGreeting";

export default function UserPage() {
  return (
    <div className="space-y-6">
      <UserGreeting name="Gleison" />
      {/* O resto da página aqui */}
    </div>
  );
}
