"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import type { SolveMatrixRequest } from "@/lib/api";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const MatrixFormSchema = z.object({
  rows: z.coerce.number().gte(1).lte(5),
  cols: z.coerce.number().gte(2).lte(6),
  matrix: z.array(
    z.array(
      z.coerce.string().refine((val) => !isNaN(Number(val)), {
        message: "Isi setiap elemen dengan angka yang valid!",
      })
    )
  ),
  method: z.enum(["gauss", "gauss-jordan"]),
});

const emptyMatrix = Array.from({ length: 2 }, () =>
  Array.from({ length: 3 }, () => "")
);

export function FormMatrix({
  onCalculate,
}: {
  onCalculate: (input: SolveMatrixRequest) => void;
}) {
  const form = useForm<z.input<typeof MatrixFormSchema>, any, any>({
    resolver: zodResolver(MatrixFormSchema),
    defaultValues: {
      rows: 2,
      cols: 3,
      matrix: [],
      method: "gauss",
    },
  });
  const [lastChanged, setLastChanged] = useState<"rows" | "cols" | null>(null);
  const [tooltipTarget, setTooltipTarget] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const { control, handleSubmit, getValues, setValue, watch, reset } = form;
  const rows = watch("rows") as number;
  const cols = watch("cols") as number;

  useEffect(() => {
    if (rows >= 1 && cols >= 2 && rows <= 5 && cols <= 6) {
      const prev = getValues("matrix");
      const nextMatrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => prev[i]?.[j] ?? "")
      );
      setValue("matrix", nextMatrix);
    }
  }, [rows, cols, getValues, setValue]);

  useEffect(() => {
    if (lastChanged === "rows" && rows >= 1 && rows <= 5) {
      const newCols = rows + 1;
      setValue("cols", newCols);
    }
  }, [rows, lastChanged, setValue]);

  useEffect(() => {
    if (lastChanged === "cols" && cols >= 2 && cols <= 6) {
      const newRows = cols - 1;
      setValue("rows", newRows);
    }
  }, [cols, lastChanged, setValue]);

  const matrix = watch("matrix");

  const handleInputChange = (r: number, c: number, value: string) => {
    const updated = [...getValues("matrix")];
    updated[r][c] = value;
    setValue("matrix", updated, { shouldValidate: true });
  };

  function onSubmit(values: SolveMatrixRequest) {
    //const numerixMatrix = values.matrix.map((row) => row.map((cell) => parseFloat(String(cell))))
    console.log("SUBMIT", values);
    // onCalculate({
    //   matrix: numerixMatrix,
    //   method: values.method
    // })
    onCalculate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 font-orienta"
      >
        <div className="flex flex-wrap gap-4">
          <FormLabel className="font-libre-franklin font-medium">
            Ukuran Matrix (Augmented):
          </FormLabel>
          <div className="flex flex-wrap gap-4">
            <FormField
              control={control}
              name="rows"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => {
                        setLastChanged("rows");
                        field.onChange(parseInt(e.target.value));
                      }}
                      className="text-center w-25 bg-input-fill border border-input-border"
                    />
                  </FormControl>
                  <FormDescription className="text-center text-muted-col text-xs">
                    Baris (1 s.d. 5)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>x</span>
            <FormField
              control={control}
              name="cols"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      min={2}
                      max={6}
                      {...field}
                      onChange={(e) => {
                        setLastChanged("cols");
                        field.onChange(parseInt(e.target.value));
                      }}
                      className="text-center w-25 bg-input-fill border border-input-border"
                    />
                  </FormControl>
                  <FormDescription className="text-center text-muted-col text-xs">
                    Kolom (2 s.d. 6)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {rows > 0 && cols > 0 && rows <= 5 && cols <= 6 && (
          <div className="flex flex-col md:flex-row gap-4 space-y-2 items-start w-full">
            <FormLabel className="shrink-0 font-libre-franklin font-medium">
              Input Matriks:
            </FormLabel>
            <div
              className="grid w-full gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {matrix.map((row, rIdx) =>
                row.map((_value, cIdx) => {
                  return (
                    <FormField
                      key={`${rIdx}-${cIdx}`}
                      control={control}
                      name={`matrix.${rIdx}.${cIdx}`}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <Tooltip
                            open={
                              (tooltipTarget?.row === rIdx &&
                                tooltipTarget?.col === cIdx) ||
                              !!fieldState.error
                            }
                          >
                            <TooltipTrigger asChild>
                              <Input
                                {...field}
                                onKeyDown={(e) => {
                                  if (e.key === ",") {
                                    e.preventDefault();
                                    setTooltipTarget({ row: rIdx, col: cIdx });
                                    setTimeout(
                                      () => setTooltipTarget(null),
                                      2000
                                    );
                                  }
                                }}
                                onChange={(e) => {
                                  handleInputChange(rIdx, cIdx, e.target.value);
                                }}
                                required
                                className="text-center bg-input-fill border border-input-border"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {fieldState.error?.message ||
                                "Gunakan titik (.) untuk desimal, bukan koma"}
                            </TooltipContent>
                          </Tooltip>
                        </FormItem>
                      )}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap">
          <FormLabel className="font-libre-franklin font-medium">
            Metode:
          </FormLabel>
          <FormField
            control={control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2 ml-2"
                  >
                    <FormItem className="flex items-center space-x-0.5">
                      <FormControl>
                        <RadioGroupItem value="gauss" />
                      </FormControl>
                      <FormLabel className="text-xs font-normal">
                        Gauss
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-0.5">
                      <FormControl>
                        <RadioGroupItem value="gauss-jordan" />
                      </FormControl>
                      <FormLabel className="text-xs font-normal">
                        Gauss-Jordan
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="font-bold font-libre-franklin">
            Hitung!
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="font-normal font-libre-franklin"
            onClick={() => {
              reset();
              setTimeout(() => {
                setValue("matrix", emptyMatrix);
              }, 0);
            }}
          >
            Hapus Semua
          </Button>
        </div>
      </form>
    </Form>
  );
}
