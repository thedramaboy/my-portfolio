"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CaseStudySection from "./case-study-section";

type Props = {
  technologies: string[];
  techStack?: Record<string, string[]>;
  rationale: string;
};

export default function StackSection({ technologies, techStack, rationale }: Props) {
  return (
    <CaseStudySection title="Technology stack">
      <div className="space-y-6">
        {techStack ? (
          <TableContainer>
            <Table size="small" aria-label="tech stack table">
              <TableBody>
                {Object.entries(techStack).map(([category, items]) => (
                  <TableRow
                    key={category}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        width: 120,
                        fontFamily: "inherit",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "text.disabled",
                        paddingLeft: 0,
                        borderColor: "divider",
                      }}
                    >
                      {category}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "inherit",
                        fontSize: "0.875rem",
                        color: "text.secondary",
                        paddingLeft: 2,
                        borderColor: "divider",
                      }}
                    >
                      {items.join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        )}
        <p>{rationale}</p>
      </div>
    </CaseStudySection>
  );
}
