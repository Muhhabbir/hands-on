import { render, screen } from '@testing-library/react';
import Song from '../Song';

describe("Search", () => {
    test("MSW Spotify Search API", () => {
      render(
        <Song
              uri={""}
              image={""}
              title={""}
              album={""}
              selectState={function (uri: string): void {
                  throw new Error("Function not implemented.");
              } }
              isSelected={false} artists={''} duration={0}        />
      );
      const checkData = screen.getByText("Slow Dancing In The Dark");
      expect(checkData).toBeInTheDocument();
    });
  });