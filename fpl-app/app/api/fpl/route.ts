export async function GET() {
  try {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const players = data.elements;
    const teams = data.teams;
    return new Response(JSON.stringify({ players, teams }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    } else {
      return new Response(JSON.stringify({ message: "Unknown error" }), {
        status: 500,
      });
    }
  }
}
