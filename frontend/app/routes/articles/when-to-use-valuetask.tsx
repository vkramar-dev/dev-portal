import { Box, Divider, Typography } from "@mui/material";
import type { ReactNode } from "react";
import PublicationLayout from "../../components/publications/PublicationLayout";
import type { TocItem } from "../../components/publications/PublicationBody";
import { getPublication, publicationMeta } from "../../content/publications";

const publication = getPublication("when-to-use-valuetask");

export function meta() {
  return publicationMeta(publication);
}

const references = [
  {
    title: "Stephen Toub — Understanding the Whys, Whats, and Whens of ValueTask",
    url: "https://devblogs.microsoft.com/dotnet/understanding-the-whys-whats-and-whens-of-valuetask/",
  },
  {
    title: "Stephen Toub — Performance Improvements in .NET 6",
    url: "https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-6/",
  },
  {
    title: "Microsoft Learn — ValueTask<TResult> Struct",
    url: "https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1",
  },
  {
    title: "Stephen Toub — Performance Improvements in .NET 11",
    url: "https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-11/",
  },
];

const toc = [
  { id: "when-to-use-valuetask", label: "When to Use ValueTask" },
  { id: "conclusion", label: "Conclusion" },
  { id: "cache-example", label: "Example" },
  { id: "why-valuetask", label: "Why and When Was ValueTask<T> Introduced?" },
  { id: "how-valuetask-works", label: "How Does ValueTask<T> Work?" },
  { id: "valuetask-cost", label: "The Cost of Using ValueTask<T>", level: 3 },
  { id: "non-generic-valuetask", label: "The Non-Generic ValueTask" },
  { id: "valuetask-source-pooling", label: "IValueTaskSource<T> and Pooling" },
  { id: "socket-example", label: "An Example from .NET", level: 3 },
  { id: "async-method-pooling", label: "Pooling in Regular Async Methods", level: 3 },
  { id: "usage-restrictions", label: "ValueTask Usage Restrictions" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "references", label: "References" },
] satisfies TocItem[];

const contentSx = { mb: 2.5, lineHeight: 1.75 } as const;
const headingSx = { mt: 5, mb: 2, scrollMarginTop: "25px" } as const;
const subheadingSx = { mt: 3.5, mb: 1.5, scrollMarginTop: "25px" } as const;

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography id={id} component="h2" variant="h5" sx={headingSx}>
      {children}
    </Typography>
  );
}

function Subheading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Typography id={id} component="h3" variant="h6" sx={subheadingSx}>
      {children}
    </Typography>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <Typography component="p" variant="body1" sx={contentSx}>
      {children}
    </Typography>
  );
}

// A lightweight C# highlighter for the article's short, static examples.
// No runtime parser or syntax-highlighting dependency is required.
const codeTokenPattern =
  /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:interface|abstract|as|async|await|bool|break|byte|catch|char|class|const|decimal|double|else|false|finally|float|for|foreach|if|int|internal|is|long|namespace|new|null|object|out|override|private|protected|public|readonly|ref|return|short|stackalloc|static|string|struct|this|throw|true|try|typeof|unsafe|using|var|void|while)\b|\b[A-Z][A-Za-z0-9_]*\b|\b\d[\d_]*(?:\.\d[\d_]*)?\b/g;

function highlightCodeLine(line: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let previousEnd = 0;

  for (const match of line.matchAll(codeTokenPattern)) {
    const index = match.index ?? 0;
    if (index > previousEnd) parts.push(line.slice(previousEnd, index));

    const token = match[0];
    const color = token.startsWith("//")
      ? "text.secondary"
      : token.startsWith('"') || token.startsWith("'")
        ? "success.main"
        : /^\d/.test(token)
          ? "secondary.main"
          : /^[A-Z]/.test(token)
            ? "info.main"
            : "primary.main";

    parts.push(
      <Box component="span" key={`${index}-${token}`} sx={{ color, fontWeight: 500 }}>
        {token}
      </Box>,
    );
    previousEnd = index + token.length;
  }

  if (previousEnd < line.length) parts.push(line.slice(previousEnd));
  return parts;
}

function CodeExample({ code, title }: { code: string; title?: string }) {
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <Box
      sx={{
        my: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: "3px solid",
        borderLeftColor: "primary.main",
        borderRadius: 1.5,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.75,
          py: 0.75,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {title ?? "C#"}
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto", py: 1.25 }}>
        <Box
          component="pre"
          sx={{
            "&&": {
              m: 0,
              p: 0,
              bgcolor: "transparent",
              borderRadius: 0,
              fontSize: "0.86rem",
              lineHeight: 1.85,
              overflow: "visible",
            },
          }}
        >
          <Box
            component="code"
            sx={{ display: "block", fontFamily: '"Cascadia Code", Consolas, Monaco, monospace' }}
          >
            {lines.map((line, index) => (
              <Box
                component="span"
                key={index}
                sx={{
                  display: "flex",
                  width: "max-content",
                  minWidth: "100%",
                  whiteSpace: "pre",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box component="span" sx={{ px: 2 }}>
                  {highlightCodeLine(line)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="p"
      data-answer-note="true"
      variant="body2"
      color="text.secondary"
      sx={{ mt: -1.5, mb: 2.5, fontStyle: "italic", lineHeight: 1.65 }}
    >
      {children}
    </Typography>
  );
}

function BulletList({ children }: { children: ReactNode }) {
  return (
    <Box component="ul" sx={{ ...contentSx, mt: 0, pl: 3, "& > li": { mb: 0.75 } }}>
      {children}
    </Box>
  );
}

function NumberedList({ children }: { children: ReactNode }) {
  return (
    <Box component="ol" sx={{ ...contentSx, mt: 0, pl: 3, "& > li": { mb: 0.75 } }}>
      {children}
    </Box>
  );
}

// The opening arguments are a real ordered list, with hanging indentation.
function AnswerPoints({ children }: { children: ReactNode }) {
  return (
    <Box
      component="ol"
      sx={{
        mt: 0,
        mb: 3,
        pl: { xs: 3.5, sm: 4.5 },
        listStyleType: "decimal",
        "& > li": { pl: 0.75, mb: 2.5, lineHeight: 1.75 },
        "& > li:last-child": { mb: 0 },
        "& > li::marker": {
          color: "text.primary",
          fontWeight: 600,
          fontSize: "1em",
        },
        "& > li > p": { mb: 1.25 },
        "& > li > p:last-child": { mb: 0 },
        "& > li > p[data-answer-note]": { mt: 0, mb: 1.25 },
        "& > li > p[data-answer-note]:last-child": { mb: 0 },
      }}
    >
      {children}
    </Box>
  );
}

export default function WhenToUseValueTask() {
  return (
    <PublicationLayout publication={publication} references={references} toc={toc}>
      <Box id="when-to-use-valuetask" sx={{ scrollMarginTop: "25px" }}>
        <Paragraph>
          When should you use{" "}
          <strong>
            <code>ValueTask</code>
          </strong>{" "}
          and{" "}
          <strong>
            <code>ValueTask&lt;T&gt;</code>
          </strong>{" "}
          (hereafter, <code>ValueTask</code>) instead of{" "}
          <strong>
            <code>Task</code>
          </strong>{" "}
          and{" "}
          <strong>
            <code>Task&lt;T&gt;</code>
          </strong>{" "}
          (hereafter, <code>Task</code>)?
        </Paragraph>
      </Box>

      <Paragraph>The answer comes down to three points.</Paragraph>

      <AnswerPoints>
        <li>
          <Paragraph>
            Since <code>ValueTask</code> is a value type, unlike <code>Task</code>, which is a
            reference type, the purpose of using <code>ValueTask</code> is to reduce the number of
            allocations on the managed heap.
          </Paragraph>
          <Note>
            The very question “Which is faster — Task or ValueTask?” simply reflects a
            misunderstanding of the purpose of ValueTask.
          </Note>
        </li>

        <li>
          <Paragraph>
            When an asynchronous method suspends its execution while waiting for a result, the
            traditional implementation of asynchronous methods allocates a <code>Task</code> object
            on the managed heap.
          </Paragraph>
          <Paragraph>
            However, if we replace <code>Task</code> with <code>ValueTask</code>, then with the
            standard async method builder, we get essentially the same allocation — along with some
            additional overhead.
          </Paragraph>
        </li>

        <li>
          <Paragraph>
            So when should we use <code>ValueTask</code>?
          </Paragraph>
          <Paragraph>
            <strong>When an asynchronous method frequently completes synchronously.</strong>
          </Paragraph>
          <Paragraph>
            For example, when retrieving data from a cache, we may know in advance that in 99% of
            cases, the result will be available synchronously, immediately upon calling the method.
          </Paragraph>
          <Paragraph>
            In this case, using <code>ValueTask</code> can significantly reduce allocations on the
            managed heap.
          </Paragraph>
          <Paragraph>
            When such methods are called frequently enough, we reduce the number of allocations,
            decrease GC pressure, and potentially improve the overall performance and scalability of
            our application.
          </Paragraph>
        </li>
      </AnswerPoints>

      <SectionHeading id="conclusion">Conclusion</SectionHeading>
      <Paragraph>
        <strong>
          Use <code>Task</code> by default. Use <code>ValueTask</code> when an asynchronous method
          frequently completes synchronously and doing so allows you to avoid a significant number
          of allocations.
        </strong>
      </Paragraph>

      <SectionHeading id="cache-example">Example</SectionHeading>
      <Paragraph>
        Suppose we need to implement a method that retrieves customer information by ID.
      </Paragraph>

      <Paragraph>
        The data can be retrieved either from a cache or from a database. We know that in 99% of
        cases, the required data is already available in the cache.
      </Paragraph>

      <CodeExample
        code={`private readonly ConcurrentDictionary<int, Customer> _cache = new();

public async ValueTask<Customer> GetCustomerAsync(int id)
{
    if (_cache.TryGetValue(id, out var customer))
        return customer;

    customer = await _repository.GetCustomerAsync(id);

    _cache[id] = customer;

    return customer;
}`}
      />
      <Paragraph>
        If the data is found in the cache, the method completes synchronously, and the result is
        returned directly within the <code>ValueTask&lt;Customer&gt;</code> struct.
      </Paragraph>

      <Paragraph>
        If the required data is not in the cache and the method suspends its execution while waiting
        for the database operation to complete, a <code>Task&lt;Customer&gt;</code> object is
        allocated, and <code>ValueTask&lt;Customer&gt;</code> contains a reference to that object.
      </Paragraph>

      <Paragraph>
        If we used <code>Task&lt;Customer&gt;</code> instead of{" "}
        <code>ValueTask&lt;Customer&gt;</code>, the traditional implementation of an async method
        would allocate a <code>Task&lt;Customer&gt;</code> object even on a cache hit.
      </Paragraph>

      <Paragraph>
        Thus, in our example, using <code>ValueTask&lt;Customer&gt;</code> allows us to avoid
        allocating a <code>Task&lt;Customer&gt;</code> object on the managed heap in at least 99% of
        the method calls.
      </Paragraph>

      <Paragraph>At the same time, nothing changes for the calling code:</Paragraph>
      <CodeExample code={`Customer customer = await GetCustomerAsync(id);`} />

      <Divider sx={{ my: 4 }} />

      <SectionHeading id="why-valuetask">
        Why and When Was ValueTask&lt;T&gt; Introduced?
      </SectionHeading>

      <Paragraph>
        Originally, .NET did not have <code>ValueTask</code>. Async methods returning a result used{" "}
        <code>Task&lt;T&gt;</code>.
      </Paragraph>

      <Paragraph>
        Even when such a method completed synchronously, its result still had to be represented by a{" "}
        <code>Task&lt;T&gt;</code> object.
      </Paragraph>

      <Paragraph>
        The only way to avoid allocating a new object on each such call was to reuse an existing{" "}
        <code>Task&lt;T&gt;</code> instance.
      </Paragraph>

      <Paragraph>
        .NET caches <code>Task&lt;T&gt;</code> objects for certain common results, such as{" "}
        <code>true</code> and <code>false</code>. Developers could also cache{" "}
        <code>Task&lt;T&gt;</code> objects themselves for known results.
      </Paragraph>

      <Paragraph>
        However, this approach did not solve the allocation problem when returning arbitrary values.
      </Paragraph>

      <Paragraph>
        This is why <code>ValueTask&lt;T&gt;</code> was introduced in .NET Core 2.0 — a value type
        capable of holding either the result itself or a reference to a <code>Task&lt;T&gt;</code>{" "}
        object.
      </Paragraph>

      <Paragraph>
        In .NET Core 2.1, its capabilities were extended to support{" "}
        <code>IValueTaskSource&lt;T&gt;</code>.
      </Paragraph>

      <SectionHeading id="how-valuetask-works">How Does ValueTask&lt;T&gt; Work?</SectionHeading>
      <Paragraph>
        In its current implementation, <code>ValueTask&lt;T&gt;</code> can represent the result of
        an asynchronous operation in one of three ways:
      </Paragraph>

      <BulletList>
        <li>
          It can hold the result of type <code>T</code> directly.
        </li>
        <li>
          It can hold a reference to a <code>Task&lt;T&gt;</code> object.
        </li>
        <li>
          It can hold a reference to an object implementing <code>IValueTaskSource&lt;T&gt;</code>.
        </li>
      </BulletList>

      <Paragraph>We have already covered the first two scenarios in our cache example.</Paragraph>
      <Paragraph>
        The third scenario allows us to reduce allocations even when an operation actually completes
        asynchronously.
      </Paragraph>

      <Paragraph>
        Before discussing it, however, let's consider another aspect of{" "}
        <code>ValueTask&lt;T&gt;</code>.
      </Paragraph>

      <Subheading id="valuetask-cost">The Cost of Using ValueTask&lt;T&gt;</Subheading>
      <Paragraph>
        When returning a <code>Task&lt;T&gt;</code>, we return a reference to an object. On a 64-bit
        platform, such a reference occupies 8 bytes.
      </Paragraph>

      <Paragraph>
        When returning a <code>ValueTask&lt;T&gt;</code>, we return a struct containing several
        fields, including a field that holds the result of type <code>T</code>.
      </Paragraph>

      <Paragraph>
        The size of this struct is greater than that of a reference and depends, among other things,
        on the type <code>T</code>.
      </Paragraph>

      <Paragraph>
        Consequently, passing and copying this struct may involve moving more data.
      </Paragraph>

      <Paragraph>
        In addition, using <code>ValueTask&lt;T&gt;</code> may increase the size of the calling
        method's async state machine, as it may need to store a larger awaiter when execution is
        suspended.
      </Paragraph>

      <Paragraph>
        Thus, while reducing the number of allocations on the managed heap, we introduce some
        additional overhead.
      </Paragraph>

      <Paragraph>
        This is why using <code>ValueTask&lt;T&gt;</code> instead of <code>Task&lt;T&gt;</code> is
        not always an optimization.
      </Paragraph>

      <SectionHeading id="non-generic-valuetask">The Non-Generic ValueTask</SectionHeading>
      <Paragraph>
        So far, we have primarily discussed <code>ValueTask&lt;T&gt;</code>.
      </Paragraph>

      <Paragraph>
        However, there is also a non-generic version — <code>ValueTask</code>.
      </Paragraph>

      <Paragraph>Consider the following example:</Paragraph>
      <CodeExample
        code={`public async Task SaveAsync(Customer customer)
{
    if (!customer.HasChanges)
        return;

    await _repository.SaveAsync(customer);
}`}
      />
      <Paragraph>
        If the customer has not been modified, the method completes successfully and synchronously.
      </Paragraph>

      <Paragraph>
        However, in this case, no new <code>Task</code> object is allocated. .NET uses an existing
        object representing a successfully completed operation:
      </Paragraph>

      <CodeExample code={`Task.CompletedTask`} />
      <Paragraph>
        Therefore, replacing <code>Task</code> with <code>ValueTask</code> in this example will not
        reduce the number of allocations on the synchronous completion path.
      </Paragraph>

      <Paragraph>
        In fact, when <code>ValueTask&lt;T&gt;</code> was introduced in .NET Core 2.0, the
        non-generic <code>ValueTask</code> did not yet exist — there was no need for it to optimize
        successful synchronous completion.
      </Paragraph>

      <Paragraph>
        It was introduced in .NET Core 2.1, along with a mechanism that made it possible to reduce
        allocations even when operations complete asynchronously.
      </Paragraph>

      <Paragraph>Let's take a look at that mechanism.</Paragraph>

      <SectionHeading id="valuetask-source-pooling">
        IValueTaskSource&lt;T&gt; and Pooling
      </SectionHeading>

      <Paragraph>
        So far, we have discussed the standard implementation of asynchronous methods.
      </Paragraph>

      <Paragraph>
        However, it is possible to avoid allocating a new <code>Task&lt;T&gt;</code> object even
        when an operation actually completes asynchronously.
      </Paragraph>

      <Paragraph>
        This is where the <code>IValueTaskSource&lt;T&gt;</code> interface comes into play:
      </Paragraph>

      <CodeExample
        code={`public interface IValueTaskSource<out TResult>
{
    ValueTaskSourceStatus GetStatus(short token);

    void OnCompleted(
        Action<object?> continuation,
        object? state,
        short token,
        ValueTaskSourceOnCompletedFlags flags);

    TResult GetResult(short token);
}`}
      />
      <Paragraph>
        An object implementing this interface provides the mechanism required to interact with an
        asynchronous operation: checking its status, registering a continuation, and retrieving its
        result or propagating an exception.
      </Paragraph>

      <Paragraph>
        Unlike a <code>Task&lt;T&gt;</code>, however, such an object can be designed for repeated
        sequential use.
      </Paragraph>

      <Paragraph>This opens up the possibility of pooling.</Paragraph>
      <Paragraph>Suppose we are developing a high-performance networking library.</Paragraph>
      <Paragraph>
        Instead of allocating a new <code>Task&lt;T&gt;</code> object for every asynchronous
        operation, we can use a pool of reusable objects implementing{" "}
        <code>IValueTaskSource&lt;T&gt;</code>.
      </Paragraph>

      <Paragraph>The execution of an operation would then look like this:</Paragraph>
      <NumberedList>
        <li>Obtain an available object from the pool.</li>
        <li>Initialize it for the new operation.</li>
        <li>
          Return a <code>ValueTask&lt;T&gt;</code> containing a reference to that object.
        </li>
        <li>Once the operation completes, the calling code retrieves the result.</li>
        <li>Return the object to the pool for subsequent reuse.</li>
      </NumberedList>

      <Paragraph>
        Notice the <code>token</code> parameter in the interface methods.
      </Paragraph>

      <Paragraph>
        When reusing the same object, we need a way to distinguish between the operations it
        represents. The token allows the implementation to verify that an access corresponds to the
        current operation.
      </Paragraph>

      <Paragraph>
        As a result, we no longer need to allocate a new object for every asynchronous operation.
      </Paragraph>

      <Paragraph>
        Of course, the objects implementing <code>IValueTaskSource&lt;T&gt;</code> themselves still
        need to be allocated. However, by reusing them, we can make these allocations considerably
        less frequent.
      </Paragraph>

      <Paragraph>
        It is important to understand that <code>ValueTask&lt;T&gt;</code> does not provide pooling
        automatically. Object reuse is the responsibility of the corresponding{" "}
        <code>IValueTaskSource&lt;T&gt;</code> implementation.
      </Paragraph>

      <Paragraph>
        For operations that do not return a value, the non-generic <code>IValueTaskSource</code>{" "}
        interface serves the same purpose.
      </Paragraph>

      <Subheading id="socket-example">An Example from .NET</Subheading>
      <Paragraph>
        A good example of this mechanism is one of the methods provided by the <code>Socket</code>{" "}
        class:
      </Paragraph>

      <CodeExample
        code={`public ValueTask<int> ReceiveAsync(
    Memory<byte> buffer,
    SocketFlags socketFlags,
    CancellationToken cancellationToken = default);`}
      />
      <Paragraph>
        If the operation completes synchronously, the method can return the number of bytes received
        directly within <code>ValueTask&lt;int&gt;</code>.
      </Paragraph>

      <Paragraph>
        If the operation completes asynchronously, the method can use a reusable object implementing{" "}
        <code>IValueTaskSource&lt;int&gt;</code>.
      </Paragraph>

      <Paragraph>
        Thus, in this case, using <code>ValueTask&lt;int&gt;</code> allows us to reduce allocations
        in both scenarios — synchronous and asynchronous completion.
      </Paragraph>

      <Subheading id="async-method-pooling">Pooling in Regular Async Methods</Subheading>
      <Paragraph>
        Starting with .NET 6 and C# 10, we can also use a specialized async method builder when
        implementing our own asynchronous methods:
      </Paragraph>

      <CodeExample
        code={`[AsyncMethodBuilder(
    typeof(PoolingAsyncValueTaskMethodBuilder<>))]
public async ValueTask<int> ReadAsync()
{
    return await _reader.ReadAsync();
}`}
      />
      <Paragraph>
        <code>PoolingAsyncValueTaskMethodBuilder&lt;T&gt;</code> makes it possible to reuse objects
        that implement <code>IValueTaskSource&lt;T&gt;</code> and contain the async state machine,
        instead of allocating a new <code>Task&lt;T&gt;</code> object each time the method suspends
        its execution. If no suitable reusable object is available, a new one must still be
        allocated.
      </Paragraph>

      <Paragraph>
        For methods that do not return a value, there is a corresponding non-generic version:
      </Paragraph>

      <CodeExample
        code={`[AsyncMethodBuilder(
    typeof(PoolingAsyncValueTaskMethodBuilder))]
public async ValueTask SaveAsync()
{
    await _repository.SaveAsync();
}`}
      />
      <Paragraph>
        This allows us to benefit from pooling in our own asynchronous methods without having to
        implement <code>IValueTaskSource</code> ourselves.
      </Paragraph>

      <Paragraph>
        This is a specialized optimization mechanism that is worth considering when the performance
        requirements of an application justify its use.
      </Paragraph>

      <Paragraph>
        Simply replacing <code>Task</code> with <code>ValueTask</code> does not enable this
        mechanism automatically.
      </Paragraph>

      <SectionHeading id="usage-restrictions">ValueTask Usage Restrictions</SectionHeading>
      <Paragraph>
        The ability to reuse objects underlying <code>ValueTask</code> imposes certain restrictions
        on how it can be used.
      </Paragraph>

      <Paragraph>
        Unlike a <code>Task</code>, an arbitrary <code>ValueTask</code> instance must not be awaited
        multiple times.
      </Paragraph>

      <Paragraph>For example:</Paragraph>
      <CodeExample
        code={`var operation = GetCustomerAsync(id);

Customer customer1 = await operation;
Customer customer2 = await operation;`}
      />
      <Paragraph>
        This code is perfectly valid when using <code>Task&lt;T&gt;</code>, but it violates the
        consumption contract of an arbitrary <code>ValueTask&lt;T&gt;</code>.
      </Paragraph>

      <Paragraph>
        After the result has been retrieved for the first time, the underlying{" "}
        <code>IValueTaskSource&lt;T&gt;</code> object may already have been returned to the pool and
        reused to represent an entirely different operation.
      </Paragraph>

      <Paragraph>
        If we need to await the result of an operation multiple times or use it with mechanisms that
        work with <code>Task</code>, such as <code>Task.WhenAll</code>, we can perform a conversion:
      </Paragraph>

      <CodeExample code={`Task<Customer> task = GetCustomerAsync(id).AsTask();`} />
      <Paragraph>
        From that point onward, we should work exclusively with the resulting{" "}
        <code>Task&lt;Customer&gt;</code> object.
      </Paragraph>

      <Paragraph>
        However, the conversion itself may require an allocation, thereby eliminating the
        allocation-saving benefit of using <code>ValueTask&lt;T&gt;</code> in the first place.
      </Paragraph>

      <Paragraph>
        The most natural way to consume a <code>ValueTask</code> is therefore through a single,
        direct <code>await</code>.
      </Paragraph>

      <SectionHeading id="final-thoughts">Final Thoughts</SectionHeading>
      <Paragraph>
        <code>ValueTask</code> is not a faster version of <code>Task</code>, nor is it a universal
        replacement for it.
      </Paragraph>

      <Paragraph>
        It is a memory optimization tool that allows us to reduce allocations associated with
        representing asynchronous operations.
      </Paragraph>

      <Paragraph>
        There are two main scenarios in which using <code>ValueTask</code> is justified:
      </Paragraph>

      <BulletList>
        <li>
          Frequently called asynchronous methods that often complete synchronously and would
          otherwise incur additional allocations when using <code>Task&lt;T&gt;</code>.
        </li>
        <li>
          Asynchronous operations where we can reuse objects implementing{" "}
          <code>IValueTaskSource</code>, thereby reducing allocations even when the operations
          actually complete asynchronously.
        </li>
      </BulletList>

      <Paragraph>
        In other cases, we continue to use <code>Task</code>.
      </Paragraph>

      <Divider sx={{ my: 4 }} />
      <Paragraph>
        It is also worth noting that Runtime Async, introduced in .NET 11, can eliminate
        intermediate <code>Task</code> allocations when asynchronous methods are awaited directly.
        However, this optimization depends on how the asynchronous method is called and does not
        eliminate the need for a <code>Task</code> object when it is used as an object in its own
        right.
      </Paragraph>

      <Paragraph>
        Therefore, the recommendations presented in this article regarding the choice between{" "}
        <code>Task</code> and <code>ValueTask</code> remain relevant.
      </Paragraph>
    </PublicationLayout>
  );
}
