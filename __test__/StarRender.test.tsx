import { render, screen } from "@testing-library/react";
import { StarRender } from "@/app/shelf/[id]/components/StarRender";

describe("StarRender", () => {
  it("affiche 5 étoiles vides si rating=0", () => {
    render(<StarRender rating={0} />);
    expect(screen.getAllByTestId("star-empty").length).toBe(5);
    expect(screen.queryByTestId("star-full")).toBeNull();
    expect(screen.queryByTestId("star-half")).toBeNull();
  });

  it("affiche 3 étoiles pleines, 1 demi-étoile et 1 vide pour rating=3.5", () => {
    render(<StarRender rating={3.5} />);
    expect(screen.getAllByTestId("star-full").length).toBe(3);
    expect(screen.getAllByTestId("star-half").length).toBe(1);
    expect(screen.getAllByTestId("star-empty").length).toBe(1);
  });

  it("affiche 5 étoiles pleines pour rating=5", () => {
    render(<StarRender rating={5} />);
    expect(screen.getAllByTestId("star-full").length).toBe(5);
    expect(screen.queryByTestId("star-half")).toBeNull();
    expect(screen.queryByTestId("star-empty")).toBeNull();
  });

  it("affiche 2 pleines, 0 demi, 3 vides pour rating=2", () => {
    render(<StarRender rating={2} />);
    expect(screen.getAllByTestId("star-full").length).toBe(2);
    expect(screen.getAllByTestId("star-empty").length).toBe(3);
    expect(screen.queryByTestId("star-half")).toBeNull();
  });
}); 